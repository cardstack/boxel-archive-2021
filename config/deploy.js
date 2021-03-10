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
      accessKeyId: process.env['YAPP_AWS_KEY'],
      secretAccessKey: process.env['YAPP_AWS_SECRET'],
      bucket: 'boxel-assets',
      region: 'ap-southeast-1',
    };
    ENV['s3-index'] = {
      accessKeyId: process.env['YAPP_AWS_KEY'],
      secretAccessKey: process.env['YAPP_AWS_SECRET'],
      bucket: 'boxel-preview',
      region: 'ap-southeast-1',
      prefix: process.env['PR_BRANCH_NAME'],
      allowOverwrite: true,
    };
  }
  return ENV;
};
