'use strict'
const axios = require('axios')
const key = require('../config/servicekey')
const url = require('../config/url')

async function fetchData (nm, hght, araCd, ssnCd, thmCd, rows, no) {
  try {
    return axios.get(url.mountainURI, {
      params: {
        ServiceKey: key.ServiceKey,
        mntnNm: nm,
        mntnHght: hght,
        mntnInfoAraCd: araCd,
        mntnInfoSsnCd: ssnCd,
        mntnInfoThmCd: thmCd,
        numOfRows: rows,
        pageNo: no
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = fetchData
