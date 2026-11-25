from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import Matakuliah


def _parse_positive_int(value, field_name):
    """Validasi bahwa nilai bertipe integer positif (> 0)."""
    if isinstance(value, bool):
        raise ValueError(f'Field {field_name} harus berupa bilangan bulat positif!')
    try:
        parsed = int(value)
    except (ValueError, TypeError):
        raise ValueError(f'Field {field_name} harus berupa bilangan bulat (integer)!')
    if parsed <= 0:
        raise ValueError(f'Field {field_name} harus bernilai positif (lebih dari 0)!')
    return parsed


# 1. READ ALL: Menampilkan seluruh daftar mata kuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data mata kuliah"""
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}


# 2. READ ONE: Menampilkan detail mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu mata kuliah berdasarkan ID di URL"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {matakuliah_id} tidak ditemukan'})

    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE: Menambahkan data mata kuliah baru
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan mata kuliah baru dari payload JSON"""
    try:
        json_data = request.json_body

        # Validasi field wajib: kode_mk, nama_mk, sks, semester
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in json_data or json_data[field] is None or str(json_data[field]).strip() == '':
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

        try:
            sks = _parse_positive_int(json_data['sks'], 'sks')
            semester = _parse_positive_int(json_data['semester'], 'semester')
        except ValueError as ve:
            return HTTPBadRequest(json_body={'error': str(ve)})

        dbsession = request.dbsession
        existing = dbsession.query(Matakuliah).filter_by(kode_mk=json_data['kode_mk']).first()
        if existing is not None:
            return HTTPBadRequest(json_body={'error': f"Matakuliah dengan kode_mk '{json_data['kode_mk']}' sudah terdaftar!"})

        matakuliah = Matakuliah(
            kode_mk=str(json_data['kode_mk']).strip(),
            nama_mk=str(json_data['nama_mk']).strip(),
            sks=sks,
            semester=semester,
        )

        dbsession.add(matakuliah)
        dbsession.flush()

        return {'success': True, 'matakuliah': matakuliah.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 4. UPDATE: Memperbarui data mata kuliah yang ada
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk mengupdate data mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {matakuliah_id} tidak ditemukan'})

    try:
        json_data = request.json_body
        if 'kode_mk' in json_data:
            if not json_data['kode_mk'] or str(json_data['kode_mk']).strip() == '':
                return HTTPBadRequest(json_body={'error': 'Field kode_mk tidak boleh kosong!'})
            new_kode = str(json_data['kode_mk']).strip()
            if new_kode != matakuliah.kode_mk:
                dup = dbsession.query(Matakuliah).filter_by(kode_mk=new_kode).first()
                if dup is not None:
                    return HTTPBadRequest(json_body={'error': f"Matakuliah dengan kode_mk '{new_kode}' sudah terdaftar!"})
            matakuliah.kode_mk = new_kode

        if 'nama_mk' in json_data:
            if not json_data['nama_mk'] or str(json_data['nama_mk']).strip() == '':
                return HTTPBadRequest(json_body={'error': 'Field nama_mk tidak boleh kosong!'})
            matakuliah.nama_mk = str(json_data['nama_mk']).strip()

        if 'sks' in json_data:
            try:
                matakuliah.sks = _parse_positive_int(json_data['sks'], 'sks')
            except ValueError as ve:
                return HTTPBadRequest(json_body={'error': str(ve)})

        if 'semester' in json_data:
            try:
                matakuliah.semester = _parse_positive_int(json_data['semester'], 'semester')
            except ValueError as ve:
                return HTTPBadRequest(json_body={'error': str(ve)})

        return {'success': True, 'matakuliah': matakuliah.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 5. DELETE: Menghapus mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()

    if matakuliah is None:
        return HTTPNotFound(json_body={'error': f'Matakuliah dengan ID {matakuliah_id} tidak ditemukan'})

    dbsession.delete(matakuliah)
    return {'success': True, 'message': f'Matakuliah dengan ID {matakuliah_id} berhasil dihapus'}
