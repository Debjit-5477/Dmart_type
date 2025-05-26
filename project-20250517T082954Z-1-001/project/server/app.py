from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime
import mysql.connector
from hdbcli import dbapi

app = Flask(__name__, 
    static_folder='../dist', 
    static_url_path='/')
CORS(app)

class DatabaseConnection:
    def __init__(self):
        self.connection = None
        self.connection_type = None

    def connect(self, config):
        if config['type'] == 'mysql':
            self.connection = mysql.connector.connect(
                host=config['host'],
                port=config['port'],
                user=config['username'],
                password=config['password'],
                database=config['database'],
                ssl_disabled=not config.get('ssl', False)
            )
        else:  # SAP HANA
            self.connection = dbapi.connect(
                address=config['host'],
                port=config['port'],
                user=config['username'],
                password=config['password'],
                encrypt=config.get('ssl', False)
            )
        self.connection_type = config['type']

    def execute_query(self, query, params=None):
        cursor = self.connection.cursor(dictionary=True)
        cursor.execute(query, params or ())
        result = cursor.fetchall()
        cursor.close()
        return result

    def close(self):
        if self.connection:
            self.connection.close()

db = DatabaseConnection()

@app.route('/api/database/connect', methods=['POST'])
def connect_database():
    try:
        config = request.json
        db.connect(config)
        return jsonify({
            "success": True,
            "message": f"Successfully connected to {config['type']} database"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/api/database/test', methods=['POST'])
def test_connection():
    try:
        if not db.connection:
            return jsonify({
                "success": False,
                "message": "No active database connection"
            }), 400

        # Test query based on database type
        test_query = "SELECT 1" if db.connection_type == 'mysql' else "SELECT 1 FROM DUMMY"
        db.execute_query(test_query)
        
        return jsonify({
            "success": True,
            "message": "Connection test successful"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/api/summary', methods=['GET'])
def get_summary():
    try:
        if not db.connection:
            return jsonify({
                "success": False,
                "message": "No active database connection"
            }), 400

        fields = db.execute_query("SELECT COUNT(*) as count FROM fields")[0]['count']
        tables = db.execute_query("SELECT COUNT(*) as count FROM tables")[0]['count']
        objects = db.execute_query("SELECT COUNT(*) as count FROM objects")[0]['count']

        return jsonify({
            "fields": fields,
            "tables": tables,
            "objects": objects
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/api/progress', methods=['GET'])
def get_progress():
    try:
        if not db.connection:
            return jsonify({
                "success": False,
                "message": "No active database connection"
            }), 400

        progress = db.execute_query("""
            SELECT 
                AVG(design_complete) as design,
                AVG(mapping_complete) as mapping,
                AVG(build_complete) as build
            FROM progress_metrics
        """)[0]

        return jsonify(progress)
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)