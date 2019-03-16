import argparse
from pymongo import MongoClient
import os
from bson.json_util import dumps


DB_URI = os.environ.get("MONGODB_URI")

class MyParserFormatter(argparse.RawTextHelpFormatter, argparse.ArgumentDefaultsHelpFormatter):
    pass


def init_parser():
    parser = argparse.ArgumentParser(description='Returns ', formatter_class=MyParserFormatter)
    parser.add_argument('--username', required=True, type=str, help='Username of account')
    return parser

def get_data(uri, username):
    client = MongoClient(uri)
    db = client.heroku_l142m8jk
    articles_collection = db.articles_data
    print((dumps(articles_collection.find({"username": username}))))


def main():
    db_uri = DB_URI
    p = init_parser()
    args = p.parse_args()
    get_data(db_uri, args.username)

if __name__ == "__main__":
    main()