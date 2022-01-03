const ExecutionContext = require('./ExecutionContext')
const LexicalEnvironment = require('./LexicalEnvironment')
const EnvironmentRecords = require('./EnvironmentRecords')

// 全局环境记录
const globalEnvironmentRecords = new EnvironmentRecords()
// 全局词法环境
const globalLexicalEnvironment = new LexicalEnvironment(globalEnvironmentRecords)
// 创建全局执行上下文
const globalExecutionContext = new ExecutionContext(globalLexicalEnvironment, window)
