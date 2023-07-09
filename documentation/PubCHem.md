# PubChem

PubChem is used to identify a compound by its chemical formula and compound name, which is later used to retrieve information from the CAS database. However, it is not recommended to use PubChem due to its outdated structure and long response times.

## Pub CHem api documentation

Documentation of pub chem api can be accessed [here](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest)

### Internal project documentation

Used requests

1. Get best matching compound

```
https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${CID}/JSON/
```

Description:
This is used to get best matching compound from database.

Expeced data format for compound (H2O):

```
{
    "ConceptsAndCIDs": {
        "Concept": [
            {
                "ConceptName": string ,
                "ConceptID": number (int),
                "Score": number (float),
                "PreferredCID": number,
                "Description": string[]
            }
        ],
        "CID": number (int)[]
    }
}

```

❗️Most instresting files is **ConceptName**, which is coresponding name in **_CAS_** database

### ❗️Don't use

**_Due to huge ammont of data it is not reccomnanded to use this address to get details about compound_**

```
https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${CID}/JSON/
```
