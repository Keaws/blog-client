/**
 * Created by Vitalii Kalchuk on 01.06.2015.
 */
var assert = require('chai').assert;

describe('Blog', function() {
    beforeEach(function () {
        browser.get('http://' + browser.params.server + ':' + browser.params.port);
    });

    it('should have 2 posts by default', function() {
        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, 2, 'Check count of posts by default');
        });
    });

    it('should add a post', function() {
        element(by.buttonText('New Post')).click();
        element(by.model('title')).sendKeys('autoPost');
        element(by.model('author')).sendKeys('autoAuthor');
        element(by.model('text')).sendKeys('autoText');
        element(by.buttonText('Add')).click();
        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, 3, 'Check count of posts after adding one');
        });
    });

    it('should navigate to first default post', function() {
        element.all(by.css('a.btn')).first().click();
        assert.ok(element(by.model('summary')).isPresent());
        assert.ok(element(by.model('text')).isPresent());
    });

    it('should add comment to a post', function() {
        element.all(by.css('a.btn')).first().click();

        var commentsCount = 0;

        element.all(by.repeater('comment in comments')).then(function (comments) {
            commentsCount = comments.length;
        });
        element(by.model('summary')).sendKeys('autoSummary');
        element(by.model('text')).sendKeys('autoText');
        element(by.buttonText('Submit')).click();

        element.all(by.repeater('comment in comments')).then(function (comments) {
            assert.equal(comments.length, commentsCount + 1, 'Check count of comments after adding');
        });
    });

    it('should delete comment', function() {
        element.all(by.css('a.btn')).first().click();

        var commentsCount = 0;

        element.all(by.repeater('comment in comments')).then(function (comments) {
            commentsCount = comments.length;
        });
        element(by.model('summary')).sendKeys('autoSummary');
        element(by.model('text')).sendKeys('autoText');
        element(by.buttonText('Submit')).click();

        element.all(by.css('img.del-btn')).first().click();
        element.all(by.repeater('comment in comments')).then(function (comments) {
            assert.equal(comments.length, commentsCount, 'Check count of comments after deleting');
        });
    });
});
