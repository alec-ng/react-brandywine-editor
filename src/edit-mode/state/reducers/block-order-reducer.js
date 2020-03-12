import {
  ADD_BLOCK,
  DELETE_FOCUSED_BLOCK,
  MOVE_BLOCK,
} from '../actions';

export default function blockOrderReducer(blockOrder=[], focusedBlock, action) {
  let newArray = blockOrder.slice();
  
  switch (action.type) {
    // insert new id into specified position
    case ADD_BLOCK: {
      if (!action.positionUuid) {
        newArray.push(action.newUuid);
      } else {
        const positionId = action.positionUuid.startsWith('dropzone-')
          ? action.positionUuid.split('dropzone-')[1]
          : action.positionUuid;
        const indToInsert = newArray.findIndex(val => val === positionId);
        newArray.splice(indToInsert, 0, action.newUuid);
      }
      return newArray;
    }

    // remove id of focused block
    case DELETE_FOCUSED_BLOCK: {
      const indToRemove = newArray.findIndex(uuid => uuid === focusedBlock);
      newArray.splice(indToRemove, 1);
      return newArray;
    }

    // move the {targetBlockId} to the position of {positionBlockId}
    // sample canvas ids: [dropzone-0, 0, dropzone-1, 1, dropzone-2, 2]
    case MOVE_BLOCK: {
      const oldInd = newArray.findIndex(uuid => uuid === action.targetBlockId);
      let newInd = action.positionBlockId === 'last'
        ? newArray.length
        : newArray.findIndex(uuid => uuid === action.positionBlockId);

      if (oldInd === newInd || newInd === (oldInd + 1)) {
        return blockOrder;
      }

      newArray.splice(oldInd, 1);
      if (newInd > oldInd) {
        newInd--; // because we just removed the element to move
      }  
      newArray.splice(newInd, 0, action.targetBlockId);
      return newArray;
    }
    
    default:
      return blockOrder;
  }
}