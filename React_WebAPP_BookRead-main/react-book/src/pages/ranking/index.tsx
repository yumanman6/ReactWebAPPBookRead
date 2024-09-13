import React from 'react';
import styles from './index.module.scss';
import RankingHeader from '@/pages/ranking/components/header';
import RankingContent from '@/pages/ranking/components/content';
import { createReducer } from '@/pages/ranking/store';
import { useReducer } from '@/store';

import { useRequest } from '@/hooks/useRequest';
import api from '@/pages/ranking/api';
import { ErrorBlock } from '@/base';
import Loading from '@/components/loading';

const Ranking: React.FC = React.memo(() => {
  const { data, error } = useRequest({ url: api.ranking });
  const { reducer } = React.useMemo(() => createReducer('ranking'), []);
  useReducer(reducer);

  if(error) {
    return <ErrorBlock />
  }

  if(!data) {
    return <Loading />
  }

  

  return (
    <div className={styles.ranking}>
      <RankingHeader />
      <RankingContent />
    </div>
  );
});

export default Ranking;
