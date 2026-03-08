package database

import (
"context"
"log"
"time"

"go.mongodb.org/mongo-driver/mongo"
"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {

clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

client, err := mongo.Connect(context.TODO(), clientOptions)

if err != nil {
log.Fatal(err)
}

ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

err = client.Ping(ctx, nil)

if err != nil {
log.Fatal(err)
}

DB = client.Database("resume-builder")

log.Println("MongoDB Connected")

}