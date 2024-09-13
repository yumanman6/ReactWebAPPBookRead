import React from 'react';
import cx from 'classnames';
import { useAppSelector, useAppDispatch } from '@/store';
import { Space } from '@/base';
import styles from './index.module.scss';

import api from '@/pages/search/api';
import { setHistory } from '@/pages/search/utils';
// import { setSearchMode, setSearchKeyword } from '@/store/slice/searchSlice';
import { searchActions } from '../../store';
import { useRequest } from '@/hooks/useRequest';
import { setUrlParams } from '@/utils/url';
import { px2rem } from '@/utils/unit';


const SearchHot: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode);
  const { data, error } = useRequest<string[]>({ url: api.getHotSearch });

  if (!data || error) {
    return null;
  }

  const onSearch = (e:React.MouseEvent) => {
    const keyword = (e.target as HTMLElement).dataset['keyword'] as string;
    setHistory(keyword);
    setUrlParams([['keyword', keyword]],  '/search');
    dispatch(searchActions.setSearchMode(true));
    dispatch(searchActions.setSearchKeyword(keyword))
  };

  return (
    <div className={cx(styles.searchHot, { [styles.hidden]: searchMode })}>
      <div className={styles.title}>热门搜索</div>
      <div className={styles.searchTags}>
        <Space wrap gap={[px2rem(20), px2rem(10)]}>
          {data.map((item, index) => (
            <div className={styles.tag} key={index} data-keyword={item} onClick={onSearch}>
              {item}
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
});

export default SearchHot;
