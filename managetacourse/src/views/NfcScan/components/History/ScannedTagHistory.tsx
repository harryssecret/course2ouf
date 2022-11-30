import { List } from "react-native-paper";
import React, { useState } from "react";

type ScannedTagInfosProps = {
  nfcCardId: string | undefined;
  arrivalTime: number;
};

/*
 * @todo add a route to the details of the runner
 */
const ScannedTagInfoListElement = ({
  nfcCardId,
  arrivalTime,
}: ScannedTagInfosProps) => {
  const localTime = new Date(arrivalTime);
  return (
    <List.Item
      title={`${nfcCardId}, temps : ${localTime.getMinutes()}m${localTime.getSeconds()}s`}
    />
  );
};

type ScannedTagListProps = {
  tagList: Array<ScannedTagInfosProps>;
};

/*
 * @todo Add a list of the runners who didn't finished the race yet
 */
export const ScannedTagList = ({ tagList }: ScannedTagListProps) => {
  return (
    <List.Section title="Arrivées">
      <List.Accordion
        title="Dernières arrivées"
        expanded={true}
        left={(props) => <List.Icon {...props} icon="run" />}
      >
        {tagList.map((props) => (
          <ScannedTagInfoListElement {...props} />
        ))}
      </List.Accordion>
    </List.Section>
  );
};
