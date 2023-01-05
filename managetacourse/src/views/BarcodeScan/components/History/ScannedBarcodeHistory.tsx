import { List } from "react-native-paper";
import React, { useState } from "react";
import { ScannedBarcodeInfosProps } from "../..";

/*
 * @todo add a route to the details of the runner
 */
const ScannedBarcodeInfoListElement = ({
  id,
  userBarcodeId: barcodeId,
  arrivalTime,
}: ScannedBarcodeInfosProps) => {
  const localTime = new Date(arrivalTime);
  const shortBarcodeId = barcodeId?.slice(0, 20);
  return (
    <List.Item
      key={id}
      title={`${shortBarcodeId}, temps : ${localTime.getMinutes()}m${localTime.getSeconds()}s`}
    />
  );
};

type ScannedTagListProps = {
  tagList: Array<ScannedBarcodeInfosProps>;
};

/*
 * @todo Add a list of the runners who didn't finished the race yet
 */
export const ScannedBarcodeList = ({ tagList }: ScannedTagListProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handlePress = () => setIsExpanded(!isExpanded);
  return (
    <List.Section title="Arrivées">
      <List.Accordion
        title="Dernières arrivées"
        expanded={isExpanded}
        left={(props) => <List.Icon {...props} icon="run" />}
        onPress={handlePress}
      >
        {tagList.map((props) => (
          <ScannedBarcodeInfoListElement {...props} />
        ))}
      </List.Accordion>
    </List.Section>
  );
};
