import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import * as z from 'zod';

import { fb } from '../firebase';

import { NotificationContext } from '../context/NotificationProvider';

import useAuth from '../hooks/useAuth';
import useEntries from '../hooks/useEntries';
import useGolfers from '../hooks/useGolfers';

import mastersLogo from '../images/masters.jpg';
import openLogo from '../images/open.png';
import pgaLogo from '../images/pga.jpg';
import usLogo from '../images/us.png';

import Loader from '../components/Loader';
import TextField from '../components/TextField';
import TournamentPicks from '../components/TournamentPicks';
import { Entry } from '../types';

const manageEntrySchema = z.object({
    masters: z
        .array(z.number())
        .min(4, 'You must select four golfers per tournament.')
        .max(4, 'You must select four golfers per tournament.'),
    name: z.string().nonempty('You must enter a name for your entry.'),
    open: z
        .array(z.number())
        .min(4, 'You must select four golfers per tournament.')
        .max(4, 'You must select four golfers per tournament.'),
    pga: z
        .array(z.number())
        .min(4, 'You must select four golfers per tournament.')
        .max(4, 'You must select four golfers per tournament.'),
    us: z
        .array(z.number())
        .min(4, 'You must select four golfers per tournament.')
        .max(4, 'You must select four golfers per tournament.')
});

type ManageEntryFormFields = z.infer<typeof manageEntrySchema>;

const ManageEntry = () => {
    const { name, userId } = useAuth();
    const { setSuccessMessage } = React.useContext(NotificationContext);
    const history = useHistory();
    const { id: entryId } = useParams<{ id: string }>();

    const [loading, setLoading] = React.useState(true);
    const [invalidEntry, setInvalidEntry] = React.useState(false);

    const { entriesLocked } = useEntries();

    const isNewEntry = entryId === 'new';

    const {
        errors,
        formState: { isSubmitted },
        handleSubmit,
        register,
        reset,
        setValue,
        watch
    } = useForm<ManageEntryFormFields>({
        defaultValues: {
            name: '',
            masters: [],
            open: [],
            pga: [],
            us: []
        },
        resolver: zodResolver(manageEntrySchema)
    });

    React.useEffect(() => {
        const getNumberOfUserEntries = async () => {
            let numberOfEntries = 0;

            try {
                const data = await fb
                    .firestore()
                    .collection('entries')
                    .where('userId', '==', userId)
                    .get();
                numberOfEntries = data.size;
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

            reset({
                masters: [],
                name: `${name} ${numberOfEntries + 1}`,
                open: [],
                pga: [],
                us: []
            });
        };

        const getUserEntry = async () => {
            try {
                const data = await fb
                    .firestore()
                    .collection('entries')
                    .doc(entryId)
                    .get();

                const entry = data.data() as Entry;

                if (!entry || entry.userId !== userId) {
                    setInvalidEntry(true);
                }

                reset({
                    ...entry
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (isNewEntry) {
            getNumberOfUserEntries();
        } else {
            getUserEntry();
        }
    }, [entryId, isNewEntry, name, reset, setValue, userId]);

    register('masters');
    register('open');
    register('pga');
    register('us');

    const { golfers, loadingGolfers } = useGolfers();

    const {
        masters: mastersPicks,
        open: openPicks,
        pga: pgaPicks,
        us: usPicks
    } = watch(['masters', 'open', 'pga', 'us']);

    const mastersGolfers = golfers
        ? mastersPicks
              .map((golferId) => golfers[golferId])
              .sort((a, b) => a.currentRank - b.currentRank)
        : [];
    const openGolfers = golfers
        ? openPicks
              .map((golferId) => golfers[golferId])
              .sort((a, b) => a.currentRank - b.currentRank)
        : [];
    const pgaGolfers = golfers
        ? pgaPicks
              .map((golferId) => golfers[golferId])
              .sort((a, b) => a.currentRank - b.currentRank)
        : [];
    const usGolfers = golfers
        ? usPicks
              .map((golferId) => golfers[golferId])
              .sort((a, b) => a.currentRank - b.currentRank)
        : [];

    const availableGolfers = React.useMemo(() => {
        if (golfers) {
            return Object.values(golfers)
                .filter((golfer) => {
                    return (
                        !mastersPicks.includes(golfer.golferId) &&
                        !openPicks.includes(golfer.golferId) &&
                        !pgaPicks.includes(golfer.golferId) &&
                        !usPicks.includes(golfer.golferId)
                    );
                })
                .sort((a, b) => a.currentRank - b.currentRank);
        }

        return [];
    }, [golfers, mastersPicks, openPicks, pgaPicks, usPicks]);

    const onSubmit = async (values: ManageEntryFormFields) => {
        try {
            const duplicateName = await fb
                .firestore()
                .collection('entries')
                .where('name', '==', values.name)
                .get();
            if (
                duplicateName.size > 0 &&
                duplicateName.docs[0].id !== entryId
            ) {
                throw new Error(
                    'An entry with this name already exists. Please choose a different name for your entry.'
                );
            }

            const successMessage = `Entry ${
                isNewEntry ? 'created' : 'edited'
            } successfully.`;
            if (isNewEntry) {
                await fb
                    .firestore()
                    .collection('entries')
                    .add({
                        ...values,
                        userId
                    });
            } else {
                await fb
                    .firestore()
                    .collection('entries')
                    .doc(entryId)
                    .update({
                        ...values
                    });
            }

            setSuccessMessage(successMessage);

            history.push('/entries');
        } catch (error) {
            console.error(error);
        }
    };

    if (entriesLocked || invalidEntry) {
        return <Redirect to="/entries" />;
    }

    if (loading || loadingGolfers) {
        return <Loader />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-2 has-text-weight-bold is-size-2">{`${
                isNewEntry ? 'Create' : 'Edit'
            } Entry`}</h1>
            <div className="columns">
                <div className="column is-half">
                    <TextField
                        error={errors.name}
                        label="Entry Name"
                        ref={register}
                        name="name"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Picks</label>
                <div className="columns">
                    <div className="column">
                        <TournamentPicks
                            availableGolfers={availableGolfers}
                            color="success"
                            dates="April 8 - 11"
                            error={(errors.masters as unknown) as FieldError}
                            location="Augusta National"
                            logo={mastersLogo}
                            name="The Masters"
                            selectedGolfers={mastersGolfers}
                            onToggleSelection={(newSelection) =>
                                setValue('masters', newSelection, {
                                    shouldValidate: isSubmitted
                                })
                            }
                        />
                    </div>
                    <div className="column">
                        <TournamentPicks
                            availableGolfers={availableGolfers}
                            color="info"
                            dates="May 20 - 23"
                            error={(errors.pga as unknown) as FieldError}
                            location="Kiawah Island"
                            logo={pgaLogo}
                            name="PGA Championship"
                            selectedGolfers={pgaGolfers}
                            onToggleSelection={(newSelection) =>
                                setValue('pga', newSelection, {
                                    shouldValidate: isSubmitted
                                })
                            }
                        />
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <TournamentPicks
                            availableGolfers={availableGolfers}
                            color="danger"
                            dates="June 17 - 20"
                            error={(errors.us as unknown) as FieldError}
                            location="Torrey Pines"
                            logo={usLogo}
                            name="U.S. Open"
                            selectedGolfers={usGolfers}
                            onToggleSelection={(newSelection) =>
                                setValue('us', newSelection, {
                                    shouldValidate: isSubmitted
                                })
                            }
                        />
                    </div>
                    <div className="column">
                        <TournamentPicks
                            availableGolfers={availableGolfers}
                            color="warning"
                            dates="July 15 - 18"
                            error={(errors.open as unknown) as FieldError}
                            location="Royal St. George's"
                            logo={openLogo}
                            name="The Open Championship"
                            selectedGolfers={openGolfers}
                            onToggleSelection={(newSelection) =>
                                setValue('open', newSelection, {
                                    shouldValidate: isSubmitted
                                })
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column is-one-quarter">
                    <button className="button is-large is-link is-fullwidth">
                        Save Entry
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ManageEntry;
