import argparse
from pymongo import MongoClient
import json

DB_URI = "DB_URI"
TR_KEY = "TR_KEY"
TAGS = ["category", "source", "topics"]

class MyParserFormatter(argparse.RawTextHelpFormatter, argparse.ArgumentDefaultsHelpFormatter):
    pass


def init_parser():
    parser = argparse.ArgumentParser(description='Returns ', formatter_class=MyParserFormatter)
    parser.add_argument('username', type=str, help='Username of account')
    return parser

def get_data(uri, username):
    client = MongoClient(uri)
    db = client.heroku_l142m8jk
    articles_collection = db.articles_data

    dicts = {
        "username": username,
        TAGS[0]: {},
        TAGS[1]: {},
        TAGS[2]: {}
    }

    for article in articles_collection.find({"username": username}):
        for tag in TAGS:
            art_prop = article[tag]
            if type(art_prop) == str:
                add_val(dicts[tag], art_prop)
            elif type(art_prop) == list:
                for prop in art_prop:
                    add_val(dicts[tag], prop)

    v = json.dumps(dicts)
    print(v)

def add_val(dic, val):
    if val in dic:
        dic[val] += 1
    else:
        dic[val] = 1

def main():
    keys = {}
    with open("./tokens.txt") as f:
        for l in f:
            k, v = l.split(" ")
            keys[k] = v.strip('\n')
    db_uri = keys[DB_URI]

    p = init_parser()
    args = p.parse_args()

    get_data(db_uri, args.username)

if __name__ == "__main__":
    main()