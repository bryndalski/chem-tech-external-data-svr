# How to use cas api to find and deal with results

## api address

```
https://rboq1qukh0.execute-api.us-east-2.amazonaws.com/default/search?q=SEARCH&offset=0&size=30
```

| id  | param  | description                                       | oprions                                                    |
| --- | ------ | ------------------------------------------------- | ---------------------------------------------------------- |
| 1   | Search | Get param from cas database. This is search query | name ex. Water<br/>Smile ex. C=O<br/>cas number ex:58-08-2 |
| 2   | offset | skip from top                                     | positive int                                               |
| 3   | size   | number of records to fetch                        | positive int                                               |

query should return data in the following structure

```
{
    "count": 1,
    "results": [
        {
            "rn": string(cas number),
            "name": string,
            "image": string(svg)
        }
    ]
}
```
