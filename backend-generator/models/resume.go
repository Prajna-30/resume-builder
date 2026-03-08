package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Resume struct {

ID primitive.ObjectID `bson:"_id,omitempty"`

UserID string `json:"userId"`

Name string `json:"name"`

Email string `json:"email"`

Phone string `json:"phone"`

Skills []string `json:"skills"`

Languages []string `json:"languages"`

Education interface{} `json:"education"`

Experience interface{} `json:"experience"`

Projects interface{} `json:"projects"`

}