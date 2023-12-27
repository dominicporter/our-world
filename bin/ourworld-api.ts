#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { OurWorldApiStack } from '../lib/ourworld-api-stack';

const app = new cdk.App();
new OurWorldApiStack(app, 'OurWorldApiStack');