/**
 * Created by Vitalii Kalchuk on 01.06.2015.
 */
var assert = require('chai').assert;

describe('Blog', function () {
    beforeEach(function () {
        browser.get('http://' + browser.params.server + ':' + browser.params.port);
    });

    it('should have 2 posts by default', function () {
        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, 2, 'Check count of posts by default');
        });
    });

    it('should add a post', function () {
        element(by.buttonText('New Post')).click();
        element(by.model('post.title')).sendKeys('autoPost');
        element(by.model('post.author')).sendKeys('autoAuthor');
        element(by.model('post.text')).sendKeys('autoText');
        element(by.buttonText('Add')).click();
        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, 3, 'Check count of posts after adding one');
        });
    });

    it('should navigate to first default post', function () {
        element.all(by.css('a.btn')).first().click();
        assert.ok(element(by.model('comment.summary')).isPresent());
        assert.ok(element(by.model('comment.text')).isPresent());
    });

    it('should add comment to a post', function () {
        element.all(by.css('a.btn')).first().click();

        var commentsCount = 0;

        element.all(by.repeater('comment in comments')).then(function (comments) {
            commentsCount = comments.length;
        });
        element(by.model('comment.summary')).sendKeys('autoSummary');
        element(by.model('comment.text')).sendKeys('autoText');
        element(by.buttonText('Submit')).click();

        element.all(by.repeater('comment in comments')).then(function (comments) {
            assert.equal(comments.length, commentsCount + 1, 'Check count of comments after adding');
        });
    });

    it('should edit comment', function () {
        element.all(by.css('a.btn')).first().click();
        element.all(by.css('[title="Edit"]')).first().click();
        element(by.model('comment.summary')).clear().sendKeys('autoEditSummary');
        element(by.buttonText('Update')).click();
        element(by.repeater('comment in comments').row(0).column('comment.summary')).getText().then(function (summary) {
            assert.equal(summary, 'autoEditSummary');
        })
    });

    it('should delete comment', function () {
        element.all(by.css('a.btn')).first().click();

        var commentsCount = 0;

        element.all(by.repeater('comment in comments')).then(function (comments) {
            commentsCount = comments.length;
        });
        element(by.model('comment.summary')).sendKeys('autoSummary');
        element(by.model('comment.text')).sendKeys('autoText');
        element(by.buttonText('Submit')).click();

        element.all(by.css('[title="Delete"]')).first().click();
        element.all(by.repeater('comment in comments')).then(function (comments) {
            assert.equal(comments.length, commentsCount, 'Check count of comments after deleting');
        });
    });

    it('should delete post', function () {
        var postsCount = 0;

        element.all(by.repeater('post in posts')).then(function (posts) {
            postsCount = posts.length;
        });

        element.all(by.css('[title="Delete"]')).first().click();
        $('div.modal-dialog').waitReady();
        element(by.buttonText('Delete')).click();
        element.all(by.repeater('post in posts')).then(function (posts) {
            assert.equal(posts.length, postsCount - 1, 'Check count of posts after deleting');
        });
    });

    it('should update post', function () {
        element.all(by.css('[title="Edit"]')).first().click();
        element(by.model('post.title')).clear().sendKeys('autoEdit');
        element(by.buttonText('Update')).click();
        element(by.repeater('post in posts').row(0).column('post.title')).getText().then(function (text) {
            assert.equal(text, 'autoEdit');
        });
    });
});
