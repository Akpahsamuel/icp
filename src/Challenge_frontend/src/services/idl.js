export const idlFactory = ({ IDL }) => {
    const Time = IDL.Nat64;
    const HealthRecord = IDL.Record({
        patient_name: IDL.Text,
        age: IDL.Nat,
        diagnosis: IDL.Text,
        treatment: IDL.Text,
        record_date: Time,
    });

    return IDL.Service({
        create_record: IDL.Func([HealthRecord], [], []),
        read_record: IDL.Func([IDL.Principal], [IDL.Opt(HealthRecord)], ["query"]),
        update_record: IDL.Func([HealthRecord], [IDL.Variant({ ok: IDL.Text, err: IDL.Text })], []),
        delete_record: IDL.Func([IDL.Principal], [IDL.Variant({ ok: IDL.Null, err: IDL.Text })], []),
        test: IDL.Func([], [IDL.Text], ["query"]),
    });
};
export const init = ({ IDL }) => [];
