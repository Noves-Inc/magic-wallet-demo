import type { Nft, ResponseData, SentReceived, Token } from './types';
import _ from 'lodash';

export interface Action {
  label: string;
  amount: string | undefined;
  flowDirection: 'toLeft' | 'toRight';
  nft: Nft | undefined;
  token: Token | undefined;
}
export interface FlowViewItem {
  action: Action;
  rightActor: {
    address: string;
    name: string | null;
  };
  leftActor: {
    address: string;
    name: string | null;
  };
}

export function generateFlowViewData(data: ResponseData): FlowViewItem[] {
  const perspectiveAddress = data.accountAddress.toLowerCase();

  const txItems = [...data.classificationData.sent, ...data.classificationData.received];

  const paidGasIndex = _.findIndex(txItems, (item) => item.action === 'paidGas');
  if (paidGasIndex >= 0) {
    const element = txItems.splice(paidGasIndex, 1)[0];
    element.to.name = 'Validators';
    txItems.splice(txItems.length, 0, element);
  }

  const flowViewData = txItems.map((item) => {
    const action = {
      label: item.action,
      amount: item.amount || undefined,
      flowDirection: getFlowDirection(item, perspectiveAddress),
      nft: item.nft || undefined,
      token: item.token || undefined,
    };

    const rightActor = getRightActor(item, perspectiveAddress);

    const leftActor = getLeftActor(item, perspectiveAddress);

    return { action, rightActor, leftActor };
  });

  return flowViewData;
}

function getRightActor(item: SentReceived, perspectiveAddress: string) {
  if (!item.to.address || item.to.address.toLowerCase() !== perspectiveAddress) {
    return { address: item.to.address, name: item.to.name };
  }

  return { address: item.from.address, name: item.from.name };
}

function getLeftActor(item: SentReceived, perspectiveAddress: string) {
  if (item.to.address && item.to.address.toLowerCase() === perspectiveAddress) {
    return { address: item.to.address, name: item.to.name };
  }

  return { address: item.from.address, name: item.from.name };
}

function getFlowDirection(item: SentReceived, perspectiveAddress: string): 'toLeft' | 'toRight' {
  // return "toLeft" or "toRight"
  if (item.to.address && item.to.address.toLowerCase() === perspectiveAddress) {
    return 'toLeft';
  }

  if (item.from.address && item.from.address.toLowerCase() === perspectiveAddress) {
    return 'toRight';
  }

  return 'toLeft'; // default case
}
