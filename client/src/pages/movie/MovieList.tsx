import MovieTable, { IMovieTableEvents } from "../../components/MovieTable";
import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers/RootReducer";
import { Dispatch } from "react";
import MovieAction from "../../redux/actions/MovieAction";
import { IMovieState } from "../../redux/reducers/MovieReducer";

function mapStateToProps(state: IRootState): IMovieState {
    return state.movie
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents {
    return {
        onLoad() {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 10,
                key: ''
            }))
        },
        onSwitchChange(type, newState, id) {
            dispatch(MovieAction.changeSwitch(type, newState, id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)
