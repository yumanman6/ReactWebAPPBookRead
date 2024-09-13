import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store";
import { NavBar, Tabs } from "@/base";
import { rankingActions } from "@/pages/ranking/store";
import { TABS } from '@/pages/ranking/contant';

const RankingHeader: React.FC = React.memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const seletedTabKey = useAppSelector<string>((state) => state.ranking.activeTabKey);


    const onBack = () => {
        navigate(-1);
    }

    const onTab = (key: string) => {
        dispatch(rankingActions.setTabKey(key));
    }

    return <NavBar onBack={onBack}>
        <Tabs activeKey={seletedTabKey} onChange={onTab}>
            {TABS.map((item) => 
                <Tabs.Tab key={item.key} title={item.name}/>
            )}
        </Tabs>
    </NavBar>
});

export default RankingHeader;