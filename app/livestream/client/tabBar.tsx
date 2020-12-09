import React, { useMemo } from 'react';
import { Option, Badge } from '@rocket.chat/fuselage';

import { useSetting } from '../../../client/contexts/SettingsContext';
import { useTranslation } from '../../../client/contexts/TranslationContext';
import { addAction } from '../../../client/views/room/lib/Toolbox';
import Header from '../../../client/components/Header';

addAction('livestream', ({ room }) => {
	const enabled = useSetting('Livestream_enabled');
	const t = useTranslation();

	const isLive = room && room.streamingOptions && room.streamingOptions.id && room.streamingOptions.type === 'livestream';

	return useMemo(() => (enabled ? {
		groups: ['channel', 'group'],
		id: 'livestream',
		title: 'Livestream',
		icon: 'podcast',
		template: 'liveStreamTab',
		order: isLive ? -1 : 15,
		renderAction: (props): React.ReactNode => <Header.ToolBoxAction {...props}>
			{isLive ? <Header.ToolBoxAction.Badge title={t('Livestream_live_now')} variant='danger'>!</Header.ToolBoxAction.Badge> : null}
		</Header.ToolBoxAction>,
		renderOption: ({ label: { title, icon }, ...props }: any): React.ReactNode => <Option label={title} title={title} icon={icon} {...props}><Badge title={t('Livestream_live_now')} variant='danger'>!</Badge></Option>,
	} : null), [enabled, isLive, t]);
});
