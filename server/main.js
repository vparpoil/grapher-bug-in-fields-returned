import {Meteor} from 'meteor/meteor';
import {Mongo} from "meteor/mongo";
import {createQuery} from 'meteor/cultofcoders:grapher';
import moment from 'moment';

Meteor.startup(() => {

    // Create mongoDB collections
    Book = new Mongo.Collection('Book');
    Author = new Mongo.Collection('Author');

    // Clean DB
    Book.remove({});
    Author.remove({});

    // Insert elements for testing
    let id = Author.insert({
        name: "author"
    });
    Book.insert({
        authorId: id,
        name: "book",
    });

    // Create links
    Book.addLinks({
        'author': {
            type: "one",
            collection: Author,
            field: 'authorId',
        }
    });

    Author.addLinks({
        'books': {
            collection: Book,
            inversedBy: "author",
        }
    });

    // Create Query
    let grapherQueryOne = createQuery('grapherQueryOne', {
        Book: {
            name: 1,
            authorId: 1,
            author: {
                name: 1,
            },
        }
    });

    let grapherQueryTwo = createQuery('grapherQueryTwo', {
        Book: {
            name: 1,
            author: {
                name: 1,
            },
            authorId: 1,
        }
    });

    console.log("grapherQueryOne", grapherQueryOne.fetch());
    console.log("grapherQueryTwo", grapherQueryTwo.fetch());

});
