import argparse
import textrazor
import json
import urllib.parse as url_parser

textrazor.api_key = "2eb915cdbcb4b71b8b35c2e0bcd6b797546daa67305feaf545e0bf48"

class MyParserFormatter(argparse.RawTextHelpFormatter, argparse.ArgumentDefaultsHelpFormatter):
    pass


def init_parser():
    parser = argparse.ArgumentParser(description='Returns ', formatter_class=MyParserFormatter)
    parser.add_argument('url', type=str, help='URL collected for analysis')
    return parser

def main():
    p = init_parser()
    args = p.parse_args()
    meta_extract = MetaExtract(args.url)
    print(meta_extract.build_json())

class MetaExtract:
    response = None
    url = ""

    def __init__(self, url):
        client = textrazor.TextRazor(extractors=["entities", "topics"])
        client.set_cleanup_mode("cleanHTML")
        client.set_cleanup_return_cleaned(return_cleaned=True)
        client.set_classifiers(["textrazor_newscodes"])
        self.url = url
        self.response = client.analyze_url(url)
        self.response.entities().sort(key=lambda x: x.relevance_score, reverse=True)

    def build_json(self):
        return json.dumps({
            "article_url": self.url,
            "source": url_parser.urlparse(self.url).netloc.replace("http://", "").replace("www.", ""),
            "country": "None",
            "topics": [x.label for x in self.response.topics()[:5]],
            "category": [x.label.split(">")[-1].capitalize() for x in self.response.categories()[:5]],
            "article_snippet": " ".join(self.response.cleaned_text[150:400].split(" ")[1:-2])
        })


if __name__ == "__main__":
    main()