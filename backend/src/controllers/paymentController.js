const crypto =  require('crypto');
const axios = require('axios');

const newPayment = async (req, res) => {
    try {
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:3000/payment/${merchantTransactionId}`,
           
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            },
            callbackUrl:`http://localhost:4000/api/v1/payment/status/${merchantTransactionId}`
        };
       
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        axios.request(options).then(function (response) {
            console.log("respone",response.data.data.instrumentResponse.redirectInfo.url)
            //window.location.href = response.data.data.instrumentResponse.redirectInfo.ur
            return res.send({phonePayUrl:response.data.data.instrumentResponse.redirectInfo.url})
        })
        .catch(function (error) {
            console.error("error.response",error.response);
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

const checkStatus = async(req, res) => {
    const merchantTransactionId =  req.params.txnId;

    const keyIndex = 1;
    const string = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` + process.env.SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;
    const options = {
    method: 'GET',
    url: ` https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${process.env.MERCHANT_ID}`
    }
    };
   
    axios.request(options).then(async(response) => {
        console.log("RESPONSE",response,merchantTransactionId)
        res.send(response.data)
    })
    .catch((error) => {
       res.status(400)
       console.log(error)
        

    });
};

module.exports = {
    newPayment,
    checkStatus
}