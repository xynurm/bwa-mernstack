import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';

export default function CheckoutDetail() {
  const [dataTopup, setDataTopup] = useState({
    verifyID: '',
    bankAccountName: '',
    nominalItem: {
      _id: '',
      coinName: '',
      coinQuantity: 0,
      price: 0,
    },
    paymentItem: {
      payment: {
        _id: '',
        type: '',
      },
      bank: {
        _id: '',
        bankName: '',
        name: '',
        noRekening: '',
      },
    },

  });

  const router = useRouter();
  useEffect(() => {
    const dataTopupLocal = localStorage.getItem(btoa('data-topup'));
    if (dataTopupLocal) {
      const key = 'tes@4ja';
      const encrypted = CryptoJS.AES.decrypt(dataTopupLocal!, key);
      const decrypted = encrypted.toString(CryptoJS.enc.Utf8);
      const dataTopupParse = JSON.parse(decrypted!);
      setDataTopup(dataTopupParse);
    } else {
      const dataItemLocal = localStorage.getItem(btoa('data-item'));
      const key = 'result@_d4tavoucher';
      const encrypted = CryptoJS.AES.decrypt(dataItemLocal!, key);
      const decrypted = encrypted.toString(CryptoJS.enc.Utf8);
      const dataItemParse = JSON.parse(decrypted);
      router.push(`/detail/${dataItemParse._id}`);
      toast.error('Mohon lengkapi semua data !!');
    }
  }, []);

  const itemPrice = dataTopup.nominalItem.price;
  const tax = itemPrice * (10 / 100);
  const totalPrice = itemPrice + tax;
  return (
    <>
      <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Game ID
          {' '}
          <span
            className="purchase-details"
          >
            {dataTopup.verifyID}
          </span>

        </p>
        <p className="text-lg color-palette-1 mb-20">
          Order ID
          {' '}
          <span className="purchase-details">#GG001</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Item
          {' '}
          <span className="purchase-details">
            {dataTopup.nominalItem.coinQuantity}
            {' '}
            {dataTopup.nominalItem.coinName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Price
          {' '}
          <span className="purchase-details">
            <NumericFormat
              value={itemPrice}
              prefix="Rp. "
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
            />

          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%)
          {' '}
          <span className="purchase-details">
            <NumericFormat
              value={tax}
              prefix="Rp. "
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
            />

          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total
          {' '}
          <span className="purchase-details color-palette-4">
            <NumericFormat
              value={totalPrice}
              prefix="Rp. "
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
            />
          </span>

        </p>
      </div>

      <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account Name
          {' '}
          <span className="purchase-details">
            {dataTopup.bankAccountName}
          </span>

        </p>
        <p className="text-lg color-palette-1 mb-20">
          Type
          {' '}
          <span className="payment-details">{dataTopup.paymentItem.payment.type}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Name
          {' '}
          <span className="payment-details">{dataTopup.paymentItem.bank.bankName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name
          {' '}
          <span className="payment-details">
            {dataTopup.paymentItem.bank.name}
          </span>

        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number
          {' '}
          <span className="payment-details">
            {dataTopup.paymentItem.bank.noRekening}
          </span>
        </p>
      </div>
    </>
  );
}
