# fakedata
Usage as an npm dependency
1. Write a simple model as explained before. It can be a .json file or a javascript Object
2. Use it in your own module


amountArg:

Type: Number
Description: describes how many elements should be created from a given model
Required

modelArg:

Type: Object | Json file
Description: when inputType param is json, modelArg behaves as a file path to that json file. For object inputType values, modelArg behaves like a javascript object, where the model should be defined.
Required
fileName:

Type: String
Description when inputType is json fileName will describe the output path where the file will be writen to.
inputType:

Type: String
Options: object | json
Description: describes the kind of input the generator will receive and read the model from.
outputType:

Type: String
Options: object | json
Description: describes the kind of output the generator will write or return.
// Requires the package
const { generateModel } = require('fake-data-generator')
// Requires a model
const model = require('./models/example.json')
// Generate the model
const amountArg = 50
const modelArg = model
const inputType = 'object'
const outputType = 'object'
const generatedModel = generateModel({ amountArg, modelArg, inputType, outputType })
Note that when using required or import on a .json file the returned value behaves like a javascript Object.

Usage as a global npm dependency
1. Create a models directory, an output directory and write a .json model as explained before
mkdir models
mkdir output
2. Run the global npm bin script
fake-data-generator example 10 example.json
Models Format
config
Type: (optional) Object

Details: general configuration.

Properties:

locale: language used for faker.locale.
amount
Type: (optional) Number

Details: an amount of objects to generate.

When this value is present, the amount value given from a cli or the generateModel function from the npm package is overwritten.

model
Type: Object

Details: A declaration of your object model

Properties:

attributeName an attribute of your model. Example: id
type one of fake-data-generator types. Example: faker, randomNumberBetween, Object, Array.
value a value corresponding to the specified type.
options configuration options for the specified type (required by some types).
Types and Values
A valid format would be an object with the following keys:

type
value
options (optional)
faker
Currently the script supports faker methods that return Date, String or Number data only. It's not ready to handle faker methods that receive arguments yet.



faker method can be used in the value attribute like this:

suppose we want to generate a company attribute with faker, then we would declare in the model:

{
  "company": {    
    "type": "faker",
    "value": "company.companyName"
  }
}  
Literal
This is simply a pass-through for those occasions when a known value is desired.

value: any

Case with a String

{
  "operating_system": {    
    "type": "Literal",
    "value": "Linux"
  }
}
Case using an Array of elements

{
  "resources": {    
    "type": "Literal",
    "value": ["memory", "disk", "network", "cpu"]
  }
}
Object
This is how the script knows we want to nest objects say we want to declare a more complex 
company model:

value: Object an object with a type, value, options structure

{
  "company": {    
    "type": "Object",
    "value": {
      "name": {    
        "type": "faker",
        "value": "company.companyName"
      },
      "address": {
        "type": "Object",
        "value": {
          "street": {
            "type": "faker",
            "value": "address.streetAddress"
          },
          "city": {
            "type": "faker",
            "value": "address.city"
          },
          "state": {
            "type": "faker",
            "value": "address.state"
          }
        }
      }
    }
  }
}
Numbers
randomNumberBetween
The script provides a simple way to get a random number between a range of numbers

value: Array<Number> a range of values to compute the random number

{
  "timesIWatchedNicolasCageMovies": {
    "type": "randomNumberBetween",
    "value": [150, 2587655]
  }
}
randomElementInArray
The script provides a simple way to get a random element from an array of options.

value: Array a list of options to pick from.

{
  "whichMovieToWatchTonight": {
    "type": "randomElementInArray",
    "value": ["Frozen", "Mulan", "The Lion King", "Aladdin", "Pulp Fiction"]
  }
}
output

{
  "whichMovieToWatchTonight": "Pulp Fiction"
}
randomElementsInArray
This one returns a random group of elements from an array of options.

value: Array a list of options to pick from.

{
  "whichMoviesToWatchTonight": {
    "type": "randomElementsInArray",
    "value": ["Frozen", "Mulan", "The Lion King", "Aladdin", "Pulp Fiction"]
  }
}
output

{
  "whichMoviesToWatchTonight": ["Pulp Fiction", "Aladdin"]
}
randomNumberBetweenWithString
Just another version of randomNumberBetween that accepts a range of numbers, a prefix as a string and a suffix as a string

options:

prefix: String a value to be interpolated as the number prefix
suffix: String a value to be interpolated as the number suffix
{
  "publication": {
    "type": "randomNumberBetweenWithString",
    "value": [1, 2500000],
    "options": {
      "prefix": "#",
      "suffix": "*"
    }
  }
}
incrementNumber
You can get incremental numbers based on the given amount for a model

The value attribute is ignored

options:

from: Number starts incrementing from a given number
{
  "brownies": {
    "type": "incrementNumber",
    "options": {
      "from": 420
    }
  }
}
Output using an amount of 3:

[
  {
    "brownies": 420
  },
  {
    "brownies": 421
  },
  {
    "brownies": 422
  },
]
Array
Defines an Array of elements to be created with the same type.

options

size: Number How many objects to create. Required, is mutually exclusive with size: Array
size: Array A two value array where the first value is the minimum number of entries and the second is the maximum. Required, is mutually exclusive with size: Number
Extending the company model a little further: as a Number

{
  "company": {    
    "type": "Object",
    "value": {
      "name": {    
        "type": "faker",
        "value": "company.companyName"
      },
      "addresses": {
        "type": "Array",
        "options": {
          "size": 10
        },
        "value": {
          "type": "Object",
          "value": {
            "street": {
              "type": "faker",
              "value": "address.streetAddress"
            },
            "city": {
              "type": "faker",
              "value": "address.city"
            },
            "state": {
              "type": "faker",
              "value": "address.state"
            }
          }
        }
      }
    }
  }
}
as an Array

{
  "company": {    
    "type": "Object",
    "value": {
      "name": {    
        "type": "faker",
        "value": "company.companyName"
      },
      "addresses": {
        "type": "Array",
        "options": {
          "size": [5, 20]
        },
        "value": {
          "type": "Object",
          "value": {
            "street": {
              "type": "faker",
              "value": "address.streetAddress"
            },
            "city": {
              "type": "faker",
              "value": "address.city"
            },
            "state": {
              "type": "faker",
              "value": "address.state"
            }
          }
        }
      }
    }
  }
}
Concatenate
prepend
Adds a fixed String in front of another dynamic value generated by one of the other datatypes.

options

text: String The text to be prepended. required
{
  "issue": {
    "type": "prepend",
    "options": {"text": "#"},
    "value": {
      "type": "randomNumberBetween",
      "value": [1, 2500]
    }
  }
}
append
Adds a fixed String at the back of another dynamic value generated by one of the other datatypes.

options

text: String The text to be appended. required
{
  "fileName": {
    "type": "append",
    "options": {"text": ".pdf"},
    "value": {
      "type": "faker",
      "value": "random.words"
    }
  }
}
