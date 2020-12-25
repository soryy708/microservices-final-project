import pytest
from app import testClient

def testCase0(testClient):
    """1-0=1"""
    assert testClient.get('/', query_string={'a': '1', 'b': '0'}).data == b'1'

def testCase1(testClient):
    """1-1=0"""
    assert testClient.get('/', query_string={'a': '1', 'b': '1'}).data == b'0'

def testCase2(testClient):
    """1-2=-1"""
    assert testClient.get('/', query_string={'a': '1', 'b': '2'}).data == b'-1'

def testCase3(testClient):
    """1--2=3"""
    assert testClient.get('/', query_string={'a': '1', 'b': '-2'}).data == b'3'

def testCase4(testClient):
    """2-1=1"""
    assert testClient.get('/', query_string={'a': '2', 'b': '1'}).data == b'1'
