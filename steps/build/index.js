'use strict';

const fs = require('fs-extra');
const path = require('path');

const ghpages = require('gh-pages');

module.exports = {

  _publishGithupPage() {
    return new Promise((res, rej) => {
      this.logger.info('Publishing Github Page...');
      ghpages.publish(path.join(this.params.destination), (err) => {
        if (err) {
          this.logger.info('#red', 'Error uploading to github pages');
          rej({message: 'Error publishing github pages'});
        }
        this.logger.info('#green', 'Website published in github pages');
        res();
      });
    });
  },

  _uploadWebsite() {
    if (this.gitIsGithub()) {
      return Promise.resolve()
        .then(() => this.inquire('githupPagesPrompt'))
        .then(() => {
          if (this.params.githubPage) {
            return this._publishGithupPage();
          } else {
            this.logger.info('Skipping Github Page creation');
          }
        });
    }
  },

  run(ok, ko) {
    return this._uploadWebsite().then(ok, ko);
  }
};
