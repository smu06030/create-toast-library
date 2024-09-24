import { ToastType } from "./types";

type Listener = (toast: Omit<ToastType, "id">) => void;

type subscribeProps = {
  topic: string;
  listener: Listener;
};

const EventBus = () => {
  const topics = new Map<string, Listener[]>();

  const subscribe = ({ topic, listener }: subscribeProps) => {
    if (!topics.has(topic)) {
      topics.set(topic, []); 
    }

    topics.get(topic)?.push(listener);

    return () => {
      const listeners = topics.get(topic);
      if(listeners){
        listeners.splice(listeners.indexOf(listener), 1);
      }
    };
  };

  const publish = (topic: string, data: Omit<ToastType, "id">) => {
    if (!topics.has(topic)) return;

    topics.get(topic)!.forEach((event: Listener) => event(data));
  };

  return { subscribe, publish };
};

export const bus = EventBus();
