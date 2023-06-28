const solutionNested = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const solutionNestedJSON = '[{"status":"nested","key":"common","value":[{"status":"added","key":"follow","value":false},{"status":"unchanged","key":"setting1","value":"Value 1"},{"status":"deleted","key":"setting2","value":200},{"status":"changed","key":"setting3","value1":true,"value2":null},{"status":"added","key":"setting4","value":"blah blah"},{"status":"added","key":"setting5","value":{"key5":"value5"}},{"status":"nested","key":"setting6","value":[{"status":"nested","key":"doge","value":[{"status":"changed","key":"wow","value1":"","value2":"so much"}]},{"status":"unchanged","key":"key","value":"value"},{"status":"added","key":"ops","value":"vops"}]}]},{"status":"nested","key":"group1","value":[{"status":"changed","key":"baz","value1":"bas","value2":"bars"},{"status":"unchanged","key":"foo","value":"bar"},{"status":"changed","key":"nest","value1":{"key":"value"},"value2":"str"}]},{"status":"deleted","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"status":"added","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

const solutionPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

export { solutionNestedJSON, solutionNested, solutionPlain };
