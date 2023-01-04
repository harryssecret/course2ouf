import csv
import urllib3


def fetch_data():
    http = urllib3.PoolManager()
    resp = http.request(
        "GET", "https://random-data-api.com/api/v2/users/?response_type=json&size=100")


def create_file():
    pass


def main():
    pass


if __name__ == "__main__":
    main()
