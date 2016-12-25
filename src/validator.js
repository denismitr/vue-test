import _ from 'lodash'

export default {
  methods: {
    validateAll (data, rules, messages) {
      let keyValue = {}

      if (_.isObject(data)) {
        keyValue = this._recursiveIteration(keyValue, data)
      }

      return this._iterateForErrors(_.cloneDeep(keyValue), rules, messages)
    },

    validateRequired (input) {
      if (typeof input === 'string' && input.length > 0) {
        return true
      }

      if (_.isNumber(input) && input > 0) {
        return true
      }

      return false
    },

    validateAlpha (input) {
      const re = /^\w+$/i

      return this.validateRegex(input, re)
    },

    validateNumeric (input) {
      const re = /^\d{1,3}$/i

      return this.validateRegex(input, re)
    },

    validateEmail (input) {
      const re = /^(.+)@(.+){2,}\.(.+){2,}$/i

      return this.validateRegex(input, re)
    },

    validateRegex (input, re) {
      if (re.test(input)) {
        return true
      }

      return false
    },

    _recursiveIteration (keyValue, data) {
      _.forEach(data, (value, key) => {
        if (_.isObject(value)) {
          this._recursiveIteration(keyValue, value)
        } else {
          keyValue[key] = value
        }
      })

      return keyValue
    },

    _iterateForErrors (keyValue, rules, messages) {
      var errors = {
        length: 0
      }

      _.forEach(rules, (ruleString, field) => {
        let rulesList = ruleString.split('|')
        // console.log(rulesList)
        _.forEach(rulesList, (rule) => {
          if (keyValue[field] !== undefined) {
            let func = 'validate' + rule.charAt(0).toUpperCase() + rule.slice(1)

            if (!this[func](keyValue[field])) {
              errors[field] = messages[rule]
              errors.length += 1
            }
          }
        })
      })

      return errors
    }
  }
}

