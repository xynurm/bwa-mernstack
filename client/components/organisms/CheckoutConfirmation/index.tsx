import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setCheckout } from '../../../services/player';

export default function CheckoutConfirmation() {
  const [checkbox, setCheckBox] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    const dataTopupLocal = localStorage.getItem(btoa('data-topup'));
    const key = 'tes@4ja';
    const encryptedTopUp = CryptoJS.AES.decrypt(dataTopupLocal!, key);
    const decryptedTopUp = encryptedTopUp.toString(CryptoJS.enc.Utf8);
    const dataTopUpParse = JSON.parse(decryptedTopUp!);

    const dataItemLocal = localStorage.getItem(btoa('data-item'));
    const password = 'result@_d4tavoucher';
    const encryptedItem = CryptoJS.AES.decrypt(dataItemLocal!, password);
    const decryptedItem = encryptedItem.toString(CryptoJS.enc.Utf8);
    const dataItemParse = JSON.parse(decryptedItem);

    if (!checkbox) {
      toast.error('Pasitikan anda telah melakukan pembayaran');
    }

    const dataCheckout = {
      voucher: dataItemParse._id,
      nominal: dataTopUpParse.nominalItem._id,
      payment: dataTopUpParse.paymentItem.payment._id,
      bank: dataTopUpParse.paymentItem.bank._id,
      name: dataTopUpParse.bankAccountName,
      accountUser: dataTopUpParse.verifyID,
    };

    console.log('dataCheckout :', dataCheckout);
    const response = await setCheckout(dataCheckout);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success('Checkout Berhasil');
      router.push('/complete-checkout');
    }
  };

  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input type="checkbox" checked={checkbox} onClick={() => setCheckBox(!checkbox)} />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
          onClick={handleSubmit}
        >
          Confirm
          Payment

        </button>
      </div>
    </>
  );
}
