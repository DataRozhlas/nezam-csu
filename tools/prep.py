# %%
import json
import pandas as pd
# %%
# https://www.czso.cz/csu/czso/uchazeci-o-zamestnani-dosazitelni-a-podil-nezamestnanych-osob-podle-obci_090417
d = pd.read_csv('https://www.czso.cz/documents/62353418/171347245/250169-22data031122.zip/a6923d2a-61e0-450b-92bf-6fccfea8c526?version=1.1', compression='zip').append(pd.read_csv('https://www.czso.cz/documents/62353418/143520468/250169-21data011122.zip/338d1c6d-a9aa-4313-835e-8a42af93402b?version=1.1', compression='zip'))
# %%
def dt(v):
    v = str(int(v))
    return v[0:4] + '-' + v[4:6] + '-' + v[6:8]
# %%
sub = list(d[d.vuk_text.isin([
    'Uchazeči o zaměstnání dosažitelní',
    'Uchazeči o zaměstnání  dosažitelní - ženy',
])].groupby(['obdobi', 'vuk_text']).hodnota.sum().reset_index().to_dict(orient='index').values())

out = {}
for row in sub:
    dte = dt(row['obdobi'])
    if dte not in out:
        out[dte] = {}
    if 'ženy' in row['vuk_text']:
        out[dte]['z'] = row['hodnota']
    else:
        out[dte]['m'] = row['hodnota']

for row in out.values():
    row['m'] = row['m'] - row['z']

    
# %%
with open('../nezam.json', 'w') as f:
    f.write(json.dumps(out, ensure_ascii=False))
# %%
