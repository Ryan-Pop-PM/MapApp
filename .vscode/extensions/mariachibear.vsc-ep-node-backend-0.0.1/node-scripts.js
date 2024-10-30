'use strict';

const ConfirmPrompt = require('prompt-confirm');
const fs = require('fs');
const packageJSON = require('./package.json');

const { NODE_ENV } = process.env;
const INDENTATION_VALUE = 4;

/**
 * Replaces the contents of the package.json file with the new configuration
 *
 * @param {Record<string,unknown>} newContent
 */
const rewriteJSON = (newContent) =>
   fs.writeFileSync('./package.json', JSON.stringify(newContent, null, INDENTATION_VALUE), 'utf8');

/**
 * Sort an object in alphabetic order by the name of it's keys
 *
 * @param {Record<string,unknown>} object
 */
const sortByKey = (object) =>
   Object.keys(object)
      .sort()
      .reduce((obj, key) => {
         obj[key] = object[key];
         return obj;
      }, {});

switch (NODE_ENV) {
   case 'refresh:clean': {
      delete packageJSON.bugs;
      delete packageJSON.homepage;
      delete packageJSON.repository;
      rewriteJSON(packageJSON);
      break;
   }
   case 'refresh:clear': {
      delete packageJSON.main;
      const sortedPackageJson = sortByKey(packageJSON);
      rewriteJSON(sortedPackageJson);
      break;
   }
   case 'prompt:confirm': {
      const EXIT_CODE = 1;
      const promptMessage = `
This process will publish the current version of the package extension (${packageJSON.version}).
Do you want to proceed ?`;
      const prompt = new ConfirmPrompt(promptMessage);
      prompt.ask((answer) => {
         if (!answer) process.exit(EXIT_CODE);
      });
      break;
   }
   default:
      break;
}
