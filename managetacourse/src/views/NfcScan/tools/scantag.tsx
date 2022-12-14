import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { ToastAndroid, View } from "react-native";

class Tag {
  private _nfcCardId: string;

  public get nfcCardId(): string {
    return this._nfcCardId;
  }

  public set nfcCardId(value: string) {
    this._nfcCardId = value;
  }

  private _arrivalTime: Date;

  public get arrivalTime(): Date {
    return this._arrivalTime;
  }
  public set arrivalTime(value: Date) {
    this._arrivalTime = value;
  }

  constructor(nfcCardId: string, arrivalTime: Date) {
    this._nfcCardId = nfcCardId;
    this._arrivalTime = arrivalTime;
  }
}

type NfcTagProps = {
  userId: string;
};

export async function ReadTagNdef() {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tagId = await NfcManager.getTag();
    return tagId;
  } catch (e) {
    console.log(e);
    ToastAndroid.show("Erreur lors de la lecture du tag :", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

export async function writeDataNdef({ userId }: NfcTagProps) {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const data = Ndef.encodeMessage([Ndef.textRecord(userId)]);

    if (data) {
      await NfcManager.ndefHandler.writeNdefMessage(data);
    }
  } catch (e) {
    ToastAndroid.show(
      `Erreur lors de l'écriture du tag: ${e}`,
      ToastAndroid.SHORT
    );
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

export async function ReadTagMifare() {
  try {
    await NfcManager.requestTechnology(NfcTech.MifareClassic)
      .then(async () => {
        return await NfcManager.mifareClassicHandlerAndroid.mifareClassicAuthenticateA(
          0,
          [0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
        );
      })
      .then(async (data) => {
        await NfcManager.mifareClassicHandlerAndroid
          .mifareClassicSectorToBlock(0)
          .then((data) => console.log(data));
      })
      .catch((error) => console.error(error));

    const tag = await NfcManager.getTag();
    ToastAndroid.show(`Tag trouvé : ${tag?.id}`, ToastAndroid.SHORT);
    return tag;
  } catch (e) {
    console.log(e);
    ToastAndroid.show("Erreur lors de la lecture du tag", ToastAndroid.SHORT);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}
