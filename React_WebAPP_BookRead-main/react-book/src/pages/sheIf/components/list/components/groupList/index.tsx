import React from 'react';
import cx from 'classnames';
import { Grid, Popup } from '@/base';
import BookCover from '@/components/bookCover';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { IBookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';
import { useAppSelector, useAppDispatch } from '@/store';
import { shelfAction } from '@/pages/sheIf/store';
import BookList from '@/pages/sheIf/components/list/components/booklist';

const GroupList: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);
  const selectedGroup = useAppSelector<string[]>((state) => state.shelf.selectedGroup);
  const groupList = useReadLocalStorage<Record<string, IBookInfo[]>>('shelf-group') || {};
  
  const [visible, setVisible] = React.useState<boolean>(false);
  const [bookList, setBookList] = React.useState<IBookInfo[]>([]);

  const getGroupActive = (groupName: string) => {
    const index = selectedGroup.findIndex((name) => name === groupName);
    return index === -1 ? false : true;
  }
  const onGroup = (groupName: string) => {
    if(editMode) {
      dispatch(shelfAction.setSelectedGroup(groupName));
    }else {
      setVisible(true);
      setBookList(groupList[groupName]);
    }
  }

  return (
    <>
      {Object.keys(groupList).map((groupName: string) => (
        <Grid.Item key={groupName} onClick={() => onGroup(groupName)}>
          <div className={styles.group}>
            <Grid columns={2} gap={px2rem(5)}>
              {groupList[groupName].map((book) => (
                <Grid.Item key={book.bookId}>
                  <BookCover
                    src={book.coverImg}
                    alt={book.title}
                    style={{ '--width': px2rem(40), '--height': px2rem(57) }}
                  />
                </Grid.Item>
              ))}
            </Grid>
            {editMode && <i className={cx("icon-checkbox-checked", styles.icon,  {[styles.active]: getGroupActive(groupName)})}/>}
          </div>
          <div className={styles.groupName}>
                {groupName}
          </div>
        </Grid.Item>
      ))}
      <Popup 
        visible={visible} 
        position='bottom' 
        className={styles.groupPopup}
        onMaskClick={() => setVisible(false)}        
      >
        <Grid columns={3} gap={px2rem(20)}>
          <BookList bookList={bookList}/>
        </Grid>
      </Popup>
    </>
  );
});

export default GroupList;
