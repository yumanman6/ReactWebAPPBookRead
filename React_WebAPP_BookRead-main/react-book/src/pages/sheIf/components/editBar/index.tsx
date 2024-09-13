import React from 'react';
import cx from 'classnames';

import { Popup, Grid, Toast, Dialog  } from '@/base';
import { Input, InputRef } from '@/base';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import styles from './index.module.scss';
import { useAppSelector, useAppDispatch } from '@/store';
import { IBookInfo } from '@/types/book';

import { setGroup } from '@/utils/shelf';
import { shelfAction } from '../../store';

const EditBar: React.FC = React.memo(() => {
    const dispatch = useAppDispatch();
    const groupList = useReadLocalStorage<Record<string, IBookInfo[]>>('shelf-group') || {};
    
    const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);
    const selectedBook = useAppSelector<IBookInfo[]>((state) => state.shelf.selectedBook); 
    const selectedGroup = useAppSelector<string[]>((state) => state.shelf.selectedGroup);
    
    const isDisabled = !selectedBook.length && !selectedGroup.length;
    const [groupVisible, setGroupVisible] = React.useState<boolean>(false);
    const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);

    const [inputValue, setInputValue] = React.useState<string>('');
    const inputRef = React.useRef<InputRef>(null);

    const onShowGrop = () => {
        if(isDisabled) return;
        setGroupVisible(true);
    }

    const onCreateGroup = () => {
        setDialogVisible(true);
        setGroupVisible(false);
    }

    const onCancelDialog = () => {
        setInputValue('');
        setDialogVisible(false);
        inputRef.current?.clear();
    }

    const onConfirmDialog = () => {
        setInputValue('');
        setDialogVisible(false);
        inputRef.current?.clear();
        const msg = setGroup(inputValue, selectedBook, selectedGroup);
        Toast.show(msg);
        dispatch(shelfAction.clearSelectedBook([]));
        dispatch(shelfAction.clearSelectedGroup([]));
    }

    const onGroup = (name: string) => {
        const msg = setGroup(name, selectedBook, selectedGroup);
        Toast.show(msg);
        setGroupVisible(false);
        dispatch(shelfAction.clearSelectedBook([]));
        dispatch(shelfAction.clearSelectedGroup([]));
    }

    return <div className={styles.editBar}>
        <Popup position="bottom" visible={editMode} mask={false} >
            <Grid columns={2}>
                <Grid.Item onClick={onShowGrop}>
                    <div className={cx(styles.item, {[styles.disable]: isDisabled})}>分组至</div>
                </Grid.Item>
                <Grid.Item>
                    <div className={cx(styles.item, {[styles.disable]: isDisabled})}>删除({selectedBook.length + selectedGroup.length})</div>
                </Grid.Item>
            </Grid>
        </Popup>

        <Popup className={styles.group} visible={groupVisible} position='bottom' onMaskClick={() => setGroupVisible(false)}>
            <div className={styles.groupTitle}>
                书籍分组
            </div>
            <div className={styles.groupAdd} onClick={onCreateGroup}>
                <i className='icon-folder-plus'/>
                <div>新建分组</div>
            </div>
            <div className={styles.groupList}>
                {
                    Object.keys(groupList).map((groupName: string) => (
                        <div className={styles.groupItem} key={groupName}>
                            <i className='icon-folder'/>
                            <div className={styles.groupName} onClick={() => onGroup(groupName)}>{groupName}</div>
                        </div>
                    ))
                }
            </div>
        </Popup>
        <Dialog 
            visible={dialogVisible} 
            content={
                <>
                    <h2>新建分组</h2>
                    <div className={styles.input}>
                        <Input value={inputValue} onChange={setInputValue} ref={inputRef}/>
                    </div>
                </>
            }
            actions={[{
                key: 'cancel',
                text: '取消',
                onClick: onCancelDialog,
            }, {
                key: 'confirm',
                text: '提交',
                color: 'primary',
                onClick: onConfirmDialog,
            }]}
        />
    </div>
})

export default EditBar;