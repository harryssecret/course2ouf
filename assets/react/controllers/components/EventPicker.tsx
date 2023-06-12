export type Race = {
  id: number;
  start: Date;
  rankings: string[];
  status: string;
}

type EventPickerProps = {
  events: Race[];
  onChange: (value: string) => void;
}

export const EventPicker = ({events, onChange}: EventPickerProps) => {
  return <select name="race" id="race" className={"select select-bordered w-full max-w-xs"} onChange={(e) => onChange(e.target.value)}>
    <option disabled selected>Sélectionnez une course</option>
    {
      events.map((event) => {
        return <option key={event.id} value={event.id}>{event.start.toString()}</option>
      })
    }
  </select>
}
