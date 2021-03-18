import * as React from 'react';
import { FieldError } from 'react-hook-form';

import { Golfer } from '../types';

import List from './List';
import TextField from './TextField';

type TournamentPicksProps = {
    availableGolfers: Golfer[];
    color: 'danger' | 'info' | 'success' | 'warning';
    dates: string;
    error?: FieldError;
    location: string;
    logo: string;
    name: string;
    onToggleSelection: (newSelection: number[]) => void;
    selectedGolfers: Golfer[];
};

const TournamentPicks = ({
    availableGolfers,
    color,
    dates,
    error,
    location,
    logo,
    name,
    onToggleSelection,
    selectedGolfers
}: TournamentPicksProps) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const golferOptions = React.useMemo(() => {
        return availableGolfers.filter((golfer) => {
            const golferName = `${golfer.firstName} ${golfer.lastName}`;
            return golferName.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [availableGolfers, searchTerm]);

    const onGolferClick = (golfer: Golfer, currentlySelected: boolean) => {
        let updatedSelection;
        if (currentlySelected) {
            updatedSelection = selectedGolfers
                .map((selectedGolfer) => selectedGolfer.golferId)
                .filter((golferId) => golfer.golferId !== golferId);
        } else {
            updatedSelection = [
                ...selectedGolfers.map(
                    (selectedGolfer) => selectedGolfer.golferId
                ),
                golfer.golferId
            ];
        }

        onToggleSelection(updatedSelection);
        setSearchTerm('');
    };

    const renderGolfer = (golfer: Golfer) => {
        const selected = selectedGolfers.includes(golfer);

        return (
            <>
                <div className="is-flex is-align-items-center">
                    <figure className="image is-32x32 mr-2">
                        <img
                            alt={`${golfer.firstName} ${golfer.lastName}`}
                            className="is-rounded"
                            src={golfer.imageUrl}
                        />
                    </figure>
                    {`${golfer.currentRank}. ${golfer.firstName} ${golfer.lastName}`}
                </div>
                <div>
                    <input
                        checked={selected}
                        disabled={!selected && selectedGolfers.length >= 4}
                        type="checkbox"
                        onChange={() => onGolferClick(golfer, selected)}
                    />
                </div>
            </>
        );
    };

    return (
        <div className={`message is-${color}`} style={{ height: '100%' }}>
            <div className="message-body" style={{ height: '100%' }}>
                <div className="field">
                    <figure
                        className="image is-96x96"
                        style={{ margin: 'auto' }}
                    >
                        <img
                            className="m-auto is-rounded has-background-white"
                            src={logo}
                            alt={`${name} logo`}
                        />
                    </figure>
                </div>
                <div className="field">
                    <div className="has-text-weight-bold">{name}</div>
                    <div className="is-size-7">{location}</div>
                    <div className="is-size-7">{dates}</div>
                </div>
                <div className="field">
                    <List
                        data={selectedGolfers}
                        getKey={(golfer) => golfer.golferId}
                        render={renderGolfer}
                    />
                </div>
                <TextField
                    autoComplete="off"
                    inputSize="normal"
                    name="search"
                    placeholder="Search for a golfer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="field">
                    <List
                        data={golferOptions.slice(
                            0,
                            5 - selectedGolfers.length
                        )}
                        getKey={(golfer) => golfer.golferId}
                        render={renderGolfer}
                    />
                </div>
                {error && (
                    <div className="message is-danger">
                        <div className="message-body">{error.message}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TournamentPicks;
