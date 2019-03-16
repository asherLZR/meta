import argparse
import textrazor
import urllib.parse as url_parser
from pymongo import MongoClient

DB_URI = "DB_URI"
TR_KEY = "TR_KEY"

class MyParserFormatter(argparse.RawTextHelpFormatter, argparse.ArgumentDefaultsHelpFormatter):
    pass


def init_parser():
    parser = argparse.ArgumentParser(description='Returns ', formatter_class=MyParserFormatter)
    parser.add_argument('url', type=str, help='URL collected for analysis')
    parser.add_argument('username', type=str, help='Username of account')
    return parser

def post_data(uri, json_obj):
    client = MongoClient(uri)
    db = client.heroku_l142m8jk
    articles_collection = db.articles_data
    post_id = articles_collection.insert_one(json_obj).inserted_id

def main():
    keys = {}
    with open("./tokens.txt") as f:
        for l in f:
            k, v = l.split(" ")
            keys[k] = v.strip('\n')
    db_uri = keys[DB_URI]
    textrazor.api_key = keys[TR_KEY]

    p = init_parser()
    args = p.parse_args()

    meta_extract = MetaExtract(args.url, args.username).build_json()
    post_data(db_uri, meta_extract)
    print(meta_extract)

class MetaExtract:
    response = None
    url = ""
    username = ""

    def __init__(self, url, username):
        client = textrazor.TextRazor(extractors=["entities", "topics"])
        client.set_cleanup_mode("cleanHTML")
        client.set_cleanup_return_cleaned(return_cleaned=True)
        client.set_classifiers(["textrazor_newscodes"])
        self.url = url
        self.username = username
        self.response = client.analyze_url(url)
        self.response.entities().sort(key=lambda x: x.relevance_score, reverse=True)

    def build_json(self):
        return {
            "username": self.username,
            "article_url": self.url,
            "source": url_parser.urlparse(self.url).netloc.replace("http://", "").replace("www.", ""),
            "country": "None",
            "topics": [x.label for x in self.response.topics()[:5]],
            "category": [x.label.split(">")[-1].capitalize() for x in self.response.categories()[:5]],
            "article_snippet": " ".join(self.response.cleaned_text[150:400].split(" ")[1:-2]).strip("\n")
        }


if __name__ == "__main__":
    main()