import React, { ReactNode } from 'react';

import { IRoom, isDirectMessageRoom } from '../../definition/IRoom';
import { ISubscription } from '../../definition/ISubscription';
import { ReactiveUserStatus } from '../components/UserStatus';

export const colors = {
	busy: 'danger-500',
	away: 'warning-600',
	online: 'success-500',
	offline: 'neutral-600',
};

export const useRoomIcon = (room: Partial<IRoom> & Partial<ISubscription>): ReactNode | { name: string; color?: string } | null => {
	if (room.prid) {
		return { name: 'baloons' };
	}

	if (room.teamMain) {
		return { name: room.t === 'p' ? 'team-lock' : 'team' };
	}

	if (isDirectMessageRoom(room)) {
		if (room.uids && room.uids.length > 2) {
			return { name: 'balloon' };
		}

		if (room.uids && room.uids.length > 0) {
			const uid = room.uids.find((uid) => uid !== room.u?._id) || room.u?._id;

			if (!uid) {
				return null;
			}

			return <ReactiveUserStatus uid={uid} />;
		}

		return { name: 'at' };
	}

	switch (room.t) {
		case 'p':
			return { name: 'hashtag-lock' };
		case 'c':
			return { name: 'hash' };
		default:
			return null;
	}
};
