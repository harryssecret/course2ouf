import {List} from "react-native-paper";
import React, {useState} from "react";

type ScannedTagInfosProps = {
  userBarcodeId: string | undefined;
  arrivalTime: number;
};

/*
 * @todo add a route to the details of the runner
 */
const ScannedTagInfoListElement = ({
  userBarcodeId: barcodeId,
  arrivalTime,
}: ScannedTagInfosProps) => {
  const localTime = new Date(arrivalTime);
  return (
    <List.Item
      title={`${barcodeId}, temps : ${localTime.getMinutes()}m${localTime.getSeconds()}s`}
    />
  );
};

type ScannedTagListProps = {
  tagList: Array<ScannedTagInfosProps>;
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
          <ScannedTagInfoListElement {...props} />
        ))}
      </List.Accordion>
    </List.Section>
  );
};
