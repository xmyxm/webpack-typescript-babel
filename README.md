# webpack-typescript-babel
脚手架

### tsconfig.json
```javascript
{
  "compilerOptions": {
    "strictNullChecks": true,
    "moduleResolution": "node",
    "jsx": "preserve",
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "allowSyntheticDefaultImports":true,
    "target": "es6",
    "noImplicitAny": true
  },
  "exclude": [
    "node_modules",
    "lib",
    "es"
  ],
  "compileOnSave": false
}
```
1. strictNullChecks: 在严格的null检查模式下，null和undefined值不包含在任何类型里，只允许用它们自己和any来赋值（有个例外，undefined可以赋值到void）

2. moduleResolution: 决定如何处理模块。'node'对于Node.js/io.js，或者是'classic'（默认）。查看模块解析文档了解详情:https://www.tslang.cn/docs/handbook/module-resolution.html

3. jsx: TypeScript具有三种JSX模式：preserve，react和react-native。 这些模式只在代码生成阶段起作用 - 类型检查并不受影响。 在preserve模式下生成代码中会保留JSX以供后续的转换操作使用（比如：Babel）。 另外，输出文件会带有.jsx扩展名。 react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js。 react-native相当于preserve，它也保留了所有的JSX，但是输出文件的扩展名是.js。

4. noUnusedParameters: 若有未使用的参数则抛错

5. noUnusedLocals: 若有未使用的局部变量则抛错。

6. allowSyntheticDefaultImports: 允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查

7. target: 指定ECMAScript目标版本'ES3' (默认)，'ES5'，或'ES6'[1]

8. noImplicitAny: 在表达式和声明上有隐含的'any'类型时报错。

### typescript-compiler 文档地址
https://www.w3cschool.cn/typescript/typescript-compiler-options.html
