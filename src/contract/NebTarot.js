/**
 * Created by honoka on 18/5/20.
 */
let TarotItem = function (text) {
  if (text) {
    const obj = JSON.parse(text)
    this.person = obj.person
    this.tarotData = obj.tarotData
  } else {
    this.person = ''
    this.tarotData = null
  }
}

TarotItem.prototype = {
  toString: function () {
    return JSON.stringify(this)
  }
}

let NebTarot = function () {
  LocalContractStorage.defineMapProperty(this, 'tarot', {
    parse: function (text) {
      return new TarotItem(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  })
}

NebTarot.prototype = {
  init: function () {
  
  },
  
  save: function (nickName, tarotData) {
    if (!tarotData) {
      throw new Error('empty tarot')
    }
    const from = nickName || Blockchain.transaction.from
    tarotItem = new TarotItem()
    tarotItem.person = from
    tarotItem.tarotData = tarotData
    this.tarot.put(from, tarotItem)
  },
  
  get: function (from) {
    from = from || Blockchain.transaction.from
    if (!from) {
      throw new Error('invalid nebalus address')
    }
    return this.tarot.get(from)
  }
}

module.exports = NebTarot
