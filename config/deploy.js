/* eslint-env node */
'use strict';

module.exports = function (deployTarget) {
  let ENV = {
    build: {
      environment: 'production',
    },
  };
  if (deployTarget === 'production') {
    ENV.pipeline = {
      disabled: {
        allExcept: ['build', 'git'],
      },
    };
  }
  if (deployTarget === 's3-preview') {
    ENV.pipeline = {
      disabled: {
        allExcept: ['build', 'revision-data', 's3', 's3-index', 'manifest'],
      },
      activateOnDeploy: true,
    };
    ENV.s3 = {
      accessKeyId: process.env['TEMP_AWS_KEY'],
      secretAccessKey: process.env['TEMP_AWS_SECRET'],
      bucket: 'boxel-assets',
      region: 'ap-southeast-1',
      filePattern:
        '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf,wasm,json,flac}',
    };
    ENV.manifest = {
      filePattern:
        '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf,wasm,json,flac}',
    };
    ENV['s3-index'] = {
      accessKeyId: process.env['TEMP_AWS_KEY'],
      secretAccessKey: process.env['TEMP_AWS_SECRET'],
      bucket: 'boxel-preview',
      region: 'ap-southeast-1',
      prefix: process.env['PR_BRANCH_NAME'],
      allowOverwrite: true,
    };
  }
  return ENV;
};
