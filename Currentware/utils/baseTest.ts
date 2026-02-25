// globalSetup.ts
import { test as baseTest, expect, chromium, Page, Browser } from '@playwright/test';

// Save the original beforeEach
const originalBeforeEach = baseTest.beforeEach;

const test = baseTest.extend({});
let globalBeforeEachFailed = false;
// Patch beforeEach globally
test.beforeEach =  (nameOrFn: any, maybeFn?: any)=> {

  if (globalBeforeEachFailed) {
      throw new Error('Skipping due to earlier beforeEach failure');
    }
  let name: string | undefined;
  let fn: Function;

  if (typeof nameOrFn === 'function') {
    fn = nameOrFn;
  } else {
    name = nameOrFn;
    fn = maybeFn;
  }
  originalBeforeEach(name?? '', async ({ page, context, browser }, testInfo) => {
    try {
  console.log("###globalBeforeEachFailed", globalBeforeEachFailed)
    if(globalBeforeEachFailed){
        console.log("###skipping the forEach title ", name)
    }else{
       await fn({ page, context, browser }, testInfo);
    }

    } catch (error:any) {
      if(!globalBeforeEachFailed){
        globalBeforeEachFailed = true;
        console.error('### ❌ Global beforeEach failure caught:', error);
        testInfo.status = 'failed';
        testInfo.errors.push(error);
        throw error; // Short-circuit immediately
      }
    }
  });
};

// 👇 Export BOTH patched test and the original expect
export { test, expect, chromium, Page, Browser };

