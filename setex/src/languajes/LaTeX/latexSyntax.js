
export default function latexGetSyntax() {
    return {
        // Set defaultToken to invalid to see what you do not tokenize yet
        // defaultToken: 'invalid',

        keywords: [
            'and', 'del', 'from', 'not', 'while',
            'as', 'elif', 'global', 'or', 'with',
            'assert', 'else', 'if', 'pass', 'yield',
            'break', 'except', 'import', 'print',
            'class', 'exec', 'in', 'raise', 'continue', 'finally', 'is',
            'return', 'def', 'for', 'lambda', 'try',
            ':', '=',
            'isinstance', '__debug__',
        ],

        operators: [
            '+', '-', '*', '**', '/', '//', '%',
            '<<', '>>', '&', '|', '^', '~',
            '<', '>', '<=', '>=', '==', '!=', '<>',
            '+=', '-=', '*=', '/=', '//=', '%=',
            '&=', '|=', '^=', '>>=', '<<=', '**=',
        ],

        builtins: [
            'set_option', 'solve', 'simplify', 'Int', 'Real', 'Bool', 'open_log',
            'append_log', 'is_sort', 'DeclareSort', 'Function', 'is_func_decl', 'is_expr',
            'is_app', 'is_const', 'is_var', 'get_var_index', 'is_app_of',
            'If', 'Distinct', 'Const', 'Consts', 'Var', 'is_bool',
            'is_true', 'is_false', 'is_and', 'is_or', 'is_not', 'is_eq',
            'BoolSort', 'BoolVal', 'Bools', 'BoolVector', 'FreshBool',
            'Implies', 'Not', 'And', 'Or', 'MultiPattern', 'ForAll',
            'Exists', 'is_int', 'is_real', 'is_int_value', 'is_rational_value',
            'is_algebraic_value', 'IntSort', 'RealSort', 'IntVal',
            'RealVal', 'RatVal', 'Q', 'Ints', 'Reals', 'IntVector', 'RealVector',
            'FreshInt', 'FreshReal', 'ToReal', 'ToInt', 'IsInt',
            'Sqrt', 'Cbrt', 'is_bv', 'BV2Int', 'BitVecSort', 'BitVecVal',
            'BitVec', 'BitVecs', 'Concat', 'Extract', 'ULE', 'ULT',
            'UGE', 'UGT', 'UDiv', 'URem', 'SRem', 'LShR', 'RotateLeft',
            'RotateRight', 'SignExt', 'ZeroExt', 'RepeatBitVec',
            'is_array', 'ArraySort', 'Array', 'Update', 'Store',
            'Select', 'Map', 'K', 'CreateDatatypes', 'EnumSort', 'Solver',
            'SolverFor', 'SimpleSolver', 'FixedPoint', 'Tactic', 'AndThen',
            'Then', 'OrElse', 'ParOr', 'ParThen', 'ParAndThen',
            'With', 'Repeat', 'TryFor', 'Probe', 'When', 'FailIf', 'Cond',
            'substitute', 'Sum', 'Product', 'solve_using', 'prove', 'init', 'sat', 'unsat',
            'unknown'
        ],

        brackets: [
            ['(', ')', 'delimiter.parenthesis'],
            ['{', '}', 'delimiter.curly'],
            ['[', ']', 'delimiter.square']
        ],

        // operator symbols
        symbols: /[=><!~&|+\-*\/\^%]+/,
        delimiters: /[;=.@:,`]/,

        // strings
        escapes: /\\(?:[abfnrtv\\"'\n\r]|x[0-9A-Fa-f]{2}|[0-7]{3}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|N\{\w+\})/,
        rawpre: /(?:[rR]|ur|Ur|uR|UR|br|Br|bR|BR)/,
        strpre: /(?:[buBU])/,

        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // strings: need to check first due to the prefix
                [/@strpre?("""|''')/, { token: 'string.delim', bracket: '@open', next: '@mstring.$1' }],
                [/@strpre?"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/@strpre?'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/@strpre?(["'])/, { token: 'string.delim', bracket: '@open', next: '@string.$1' }],

                [/@rawpre("""|''')/, { token: 'string.delim', bracket: '@open', next: '@mrawstring.$1' }],
                [/@rawpre"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/@rawpre'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/@rawpre(["'])/, { token: 'string.delim', bracket: '@open', next: '@rawstring.$1' }],

                // identifiers and keywords
                [/__[\w$]*/, 'predefined'],
                [/[a-z_$][\w$]*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@builtins': 'constructor.identifier',
                        '@default': 'identifier'
                    }
                }],
                [/[A-Z][\w]*/, {
                    cases: {
                        '~[A-Z0-9_]+': 'constructor.identifier',
                        '@builtins': 'constructor.identifier',
                        '@default': 'namespace.identifier'
                    }
                }],  // to show class names nicely

                // whitespace
                { include: '@whitespace' },

                // delimiters and operators
                [/[{}()\[\]]/, '@brackets'],
                [/@symbols/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@operators': 'operator',
                        '@default': ''
                    }
                }],

                // numbers
                [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                [/0[xX][0-9a-fA-F]+[lL]?/, 'number.hex'],
                [/0[bB][0-1]+[lL]?/, 'number.binary'],
                [/(0[oO][0-7]+|0[0-7]+)[lL]?/, 'number.octal'],
                [/(0|[1-9]\d*)[lL]?/, 'number'],

                // delimiter: after number because of .\d floats
                [':', { token: 'keyword', bracket: '@open' }], // bracket for indentation
                [/@delimiters/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'delimiter'
                    }
                }],

            ],

            comment: [
                [/[^\/*]+/, 'comment'],
                [/\/\*/, 'comment', '@push'],    // nested comment
                ["\\*/", 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],

            // Regular strings
            mstring: [
                { include: '@strcontent' },
                [/"""|'''/, {
                    cases: {
                        '$#==$S2': { token: 'string.delim', bracket: '@close', next: '@pop' },
                        '@default': { token: 'string' }
                    }
                }],
                [/["']/, 'string'],
                [/./, 'string.invalid'],
            ],

            string: [
                { include: '@strcontent' },
                [/["']/, {
                    cases: {
                        '$#==$S2': { token: 'string.delim', bracket: '@close', next: '@pop' },
                        '@default': { token: 'string' }
                    }
                }],
                [/./, 'string.invalid'],
            ],

            strcontent: [
                [/[^\\"']+/, 'string'],
                [/\\$/, 'string.escape'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
            ],

            // Raw strings: we distinguish them to color escape sequences correctly
            mrawstring: [
                { include: '@rawstrcontent' },
                [/"""|'''/, {
                    cases: {
                        '$#==$S2': { token: 'string.delim', bracket: '@close', next: '@pop' },
                        '@default': { token: 'string' }
                    }
                }],
                [/["']/, 'string'],
                [/./, 'string.invalid'],
            ],

            rawstring: [
                { include: '@rawstrcontent' },
                [/["']/, {
                    cases: {
                        '$#==$S2': { token: 'string.delim', bracket: '@close', next: '@pop' },
                        '@default': { token: 'string' }
                    }
                }],
                [/./, 'string.invalid'],
            ],

            rawstrcontent: [
                [/[^\\"']+/, 'string'],
                [/\\["']/, 'string'],
                [/\\u[0-9A-Fa-f]{4}/, 'string.escape'],
                [/\\/, 'string'],
            ],

            // whitespace
            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/#.*$/, 'comment'],
            ],
        }
    }
}