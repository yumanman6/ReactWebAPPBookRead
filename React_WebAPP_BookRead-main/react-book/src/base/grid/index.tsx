import InternalGrid from '@/base/grid/grid';
import GridItem from '@/base/grid/grid-item';

export type {GridProps} from '@/base/grid/grid';
export type {GridItemProps} from '@/base/grid/grid-item';

type InternalGridType = typeof InternalGrid;

export interface GridInterface extends InternalGridType {
    Item: typeof GridItem
}

const Grid = InternalGrid as GridInterface;
Grid.Item = GridItem;

export default Grid;